defmodule Homework.Companies.Company do
    use Ecto.Schema
    import Ecto.Changeset
  
    @primary_key {:id, :binary_id, autogenerate: true}
    schema "companies" do
      field(:credit_line, :integer)
      field(:name, :string)
  
      timestamps()
    end
  
    @doc false
    def changeset(company, attrs) do
      company
      |> cast(attrs, [:name, :credit_line])
      |> validate_required([:name, :credit_line])
    end
  end
  