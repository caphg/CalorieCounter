class EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :destroy, :update]
  before_action :authenticate_user!

  # GET /entries
  # GET /entries.json
  def index
    @entries = Entry.where("user_id = ?", current_user)
    @entry = Entry.new
  end

  # GET /entries/1
  # GET /entries/1.json
  def show
  end

   # POST /entries
  # POST /entries.json
  def create
    @entry = Entry.new(entry_params)
    @entry['user_id'] = current_user.id
    respond_to do |format|
      if @entry.save
        format.html { redirect_to @entry, notice: 'Entry was successfully created.' }
        format.json { render :show, status: :created, location: @entry }
      else
        format.html { render :new }
        format.json { render json: @entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /entries/1
  # PATCH/PUT /entries/1.json
  def update
    respond_to do |format|
      if @entry.update(entry_params)
        format.html { redirect_to @entry, notice: 'Entry was successfully updated.' }
        format.json { render :show, status: :ok, location: @entry }
      else
        format.html { render :edit }
        format.json { render json: @entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /entries/1
  # DELETE /entries/1.json
  def destroy
    @entry.destroy
    respond_to do |format|
      format.html { redirect_to entries_url, notice: 'Entry was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entry
      @entry = current_user.entries.find_by_id(params[:id])
      head :unauthorized if @entry.nil?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def entry_params
      params.require(:entry).permit(:id, :meal, :calories, :date, :description)
    end
end
