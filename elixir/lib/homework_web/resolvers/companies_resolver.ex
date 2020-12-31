defmodule HomeworkWeb.Resolvers.CompaniesResolver do
    alias Homework.Companies
    alias Homework.Transactions

    @doc """
    Calculates available credit of company based on list of transactions
    """
    def get_available_credit(company) do
        transactions = Transactions.get_transactions_company!(company.id)
        Map.put(company, :available_credit, Enum.reduce(transactions, 0, fn(transaction), total_amount -> if transaction.debit do company.credit_line - transaction.amount + total_amount else company.credit_line + transaction.amount + total_amount end end))
    end

    @doc """
    Get a list of companies
    """
    def companies(_root, args, _info) do
      companies = Enum.map(Companies.list_companies(args), &get_available_credit/1)
      {:ok, companies}
    end
  
    @doc """
    Create a new company
    """
    def create_company(_root, args, _info) do
      case Companies.create_company(args) do
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
  
      case Companies.update_company(company, args) do
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
  