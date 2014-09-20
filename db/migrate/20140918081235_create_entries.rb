class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :meal
      t.decimal :calories
      t.column :date, 'timestamp with time zone'
      t.string :description

      t.timestamps
    end
  end
end
