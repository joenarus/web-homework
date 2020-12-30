defmodule HomeworkWeb.Resolvers.CompaniesResolver do
    alias Homework.Companies
    alias Homework.Transactions
  

    @doc """
    Calculates available credit of company based on list of transactions
    """
    def get_available_credit(company) do
        transactions = Transactions.get_transaction!(company.id)
        Map.put(company, :available_credit, Enum.reduce(transactions, 0, fn(transaction) acc -> transaction.amount + acc end))
    end

    @doc """
    Get a list of companies
    """
    def companies(_root, args, _info) do
      {:ok, Companies.list_companies(args)}
    end
  
    @doc """
    Create a new company
    """
    def create_company(_root, args, _info) do
      case Companies.create_company(args) do
        {:ok, company} ->
          {:ok, company}
  
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
          {:ok, company}
  
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
  