defmodule HomeworkWeb.Resolvers.CompaniesResolver do
    alias Homework.Companies
    alias Homework.Transactions


    def convert_to_dollar(company) do
        %{company | available_credit: company.available_credit / 100, credit_line: company.credit_line / 100}
    end
    
    def convert_to_cents(company) do
        %{company | credit_line: round(company.credit_line * 100)}
    end
    @doc """
    Calculates available credit of company based on list of transactions
    """
    def get_available_credit(company) do
        transactions = Transactions.get_transactions_company!(company.id)
        amount_spent = Enum.reduce(
            transactions, 
            0, 
            fn(transaction), 
            total_amount -> 
                if transaction.debit do 
                    total_amount - transaction.amount 
                else total_amount + transaction.amount 
            end 
        end) 

        Map.put(company, :available_credit, company.credit_line + amount_spent)
    end

    @doc """
    Get a list of companies
    """
    def companies(_root, args, _info) do
      companies = Enum.map(Companies.list_companies(args), &get_available_credit/1)
      
      {:ok, Enum.map(companies, &convert_to_dollar/1)}
    end
  
    @doc """
    Create a new company
    """
    def create_company(_root, args, _info) do
      case Companies.create_company(convert_to_cents(args)) do
        {:ok, company} ->
          {:ok, get_available_credit(company)}
  
        error ->
          {:error, "could not create company: #{inspect(error)}"}
      end
    end
  
    @doc """
    Updates a company for an id with args specified.
    """
    def update_company(_root, %{id: id} = args, _info) do
      company = Companies.get_company!(id)
  
      case Companies.update_company(company, convert_to_cents(args)) do
        {:ok, company} ->
          {:ok, get_available_credit(company)}
  
        error ->
          {:error, "could not update company: #{inspect(error)}"}
      end
    end
  
    @doc """
    Deletes a company for an id
    """
    def delete_company(_root, %{id: id}, _info) do
      company = Companies.get_company!(id)
  
      case Companies.delete_company(company) do
        {:ok, company} ->
          {:ok, company}
  
        error ->
          {:error, "could not update company: #{inspect(error)}"}
      end
    end
  end
  