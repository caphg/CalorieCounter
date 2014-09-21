json.array!(@entries) do |entry|
  json.extract! entry, :date, :calories
end