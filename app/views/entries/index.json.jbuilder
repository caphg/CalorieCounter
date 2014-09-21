  json.array!(@entries) do |entry|
    json.extract! entry, :id, :meal, :calories, :date, :description
    json.url entry_url(entry, format: :json)
  end

