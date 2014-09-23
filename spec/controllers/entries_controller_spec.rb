require 'spec_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe EntriesController, :type => :controller do

  # This should return the minimal set of attributes required to create a valid
  # Entry. As you add validations to Entry, be sure to
  # adjust the attributes here as well.

  let!(:current_user) { FactoryGirl.create(:user) }
  let!(:other_user) { FactoryGirl.create(:user) }
  let!(:valid_attributes) {
    {meal: 'pizza', date: '2014/07/08', description: 'some pizza', calories: 2000, user_id: current_user.id}

  }

  let!(:invalid_attributes) {
    {invalid_attr: 'invalid'}
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # EntriesController. Be sure to keep this updated too.
  let!(:valid_session) { {} }


  before { sign_in current_user }

  describe "GET index" do
    let!(:entry_in_range) {FactoryGirl.create(:entry, calories:2000, user: current_user, date: '2014-09-21 15:00')}
    let!(:entry_not_in_date_range) {FactoryGirl.create(:entry, calories:2000, user: current_user, date: '2014-05-21 15:00')}
    let!(:entry_not_in_time_range) {FactoryGirl.create(:entry, calories:2000, user: current_user, date: '2014-09-21 17:00')}
    let!(:date_from) {'2014/09/20'}
    let!(:date_to) {'2014/09/22'}
    let!(:time_from) {'10:00'}
    let!(:time_to) {'16:00'}

    it "gets all entries which belong to me" do
      my_entry = FactoryGirl.create(:entry, user: current_user)
      not_my_entry = FactoryGirl.create(:entry, user: other_user)
      get :index
      assigns(:entries).should =~ [my_entry, entry_in_range, entry_not_in_date_range,entry_not_in_time_range]
      assigns(:entries).should_not include(not_my_entry)
    end

    it "gets all entries within a specified date range" do
      get :index, dateFrom: date_from, dateTo: date_to, timeFrom: time_from, timeTo: time_to
      assigns(:entries).should =~ [entry_in_range]
    end

    it "gets all entries if dates/times are faulty" do
      get :index, dateFrom: date_from, dateTo: date_to, timeFrom: time_from, timeTo: 'faulty_time'
      assigns(:entries).should =~ [entry_in_range,entry_not_in_date_range,entry_not_in_time_range]
    end

    it "gets sum by dates within period" do
      get :daily, dateFrom: date_from, dateTo: date_to, timeFrom: time_from, timeTo: time_to
      entries = Entry.where('user_id = ?
                           AND "time"(date) BETWEEN ? AND ?
                           AND CAST(date AS DATE) >= ? and CAST(date AS DATE) <= ?', current_user.id, time_from, time_to, Date.parse(date_from), Date.parse(date_to)).
                    select('CAST(date AS DATE), sum(calories) as calories').group('CAST(date AS DATE)')

      assigns(:entries).map {|f| f.calories}.should =~ [2000]
    end


    it "should redirect to login page if unauthorized" do
      sign_out current_user
      get :index
      expect(response.status).to be(302)
      expect(response).to redirect_to(new_user_session_path)

      sign_in current_user
      get :index
      expect(response.status).to be(200)
    end

  end

  describe "GET show" do
    let!(:my_entry) {FactoryGirl.create(:entry, user: current_user)}
    let!(:not_my_entry) {FactoryGirl.create(:entry, user: other_user)}

    it "assigns the requested entry as @entry" do
      get :show, {:id => my_entry.to_param}
      expect(assigns(:entry)).to eq(my_entry)
    end

    it "does not show entries I do not own" do
      get :show, {:id => not_my_entry.to_param}
      expect(assigns(:entry)).to_not eq(not_my_entry)
    end

    it "should redirect to login page if unauthorized" do
      sign_out current_user
      get :show, {:id => my_entry.id}
      expect(response.status).to be(302)
      expect(response).to redirect_to(new_user_session_path)

      sign_in current_user
      get :show, {:id => my_entry.to_param}
      expect(response.status).to be(200)
    end

  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Entry" do
        expect {
          post :create, {:entry => valid_attributes}, valid_session
        }.to change(Entry, :count).by(1)
      end

      it "assigns a newly created entry as @entry" do
        post :create, {:entry => valid_attributes}, valid_session
        expect(assigns(:entry)).to be_a(Entry)
        expect(assigns(:entry)).to be_persisted
      end

      it "redirects to the created entry" do
        post :create, {:entry => valid_attributes}, valid_session
        expect(response).to redirect_to(Entry.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved entry as @entry" do
        post :create, {:entry => invalid_attributes}, valid_session
        expect(assigns(:entry)).to be_a_new(Entry)
      end

      it "re-renders the 'new' template" do
        post :create, {:entry => invalid_attributes}, valid_session
        expect(response).to render_template("new")
      end
    end

    it "should redirect to login page if unauthorized" do
      sign_out current_user
      post :create, {:entry => valid_attributes}
      expect(response.status).to be(302)
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  describe "/PATCH update" do
    describe "with valid params" do
      let!(:my_entry) {FactoryGirl.create(:entry, user: current_user)}

      it "updates the requested entry" do
        expect {patch :update, id: my_entry.id, entry: {meal: "pizza with cheese"} , :format => :json}.
            to change{my_entry.reload.meal}.from("lunch").to("pizza with cheese")

      end
    end

    describe "with invalid params" do
      let!(:my_entry) {FactoryGirl.create(:entry, user: current_user)}

      it "assigns the entry as @entry" do
        put :update, {:id => my_entry.id, :entry => invalid_attributes}
        expect(assigns(:entry)).to eq(my_entry)
      end
    end

    it "should redirect to login page if unauthorized" do
      entry = Entry.create! valid_attributes
      sign_out current_user
      patch :update, id: entry.id, entry: {meal: "pizza with cheese"}
      expect(response.status).to be(302)
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  describe "DELETE destroy" do
    let!(:my_entry) {FactoryGirl.create(:entry, user: current_user)}
    let!(:not_my_entry) {FactoryGirl.create(:entry, user: other_user)}

    it "destroys entry which I own" do
      expect {
        delete :destroy, id: my_entry.id
      }.to change{ Entry.count }.by(-1)
    end

    it "does not destroy entry which I do not own" do
      expect {
        delete :destroy, id: not_my_entry.id
      }.to_not change{ Entry.count }
    end

    it "redirects to the entries list" do
      entry = Entry.create! valid_attributes
      delete :destroy, {:id => entry.to_param}, valid_session
      expect(response).to redirect_to(entries_url)
    end

    it "should redirect to login page if unauthorized" do
      entry = Entry.create! valid_attributes
      sign_out current_user
      delete :destroy, {:id => entry.to_param}
      expect(response.status).to be(302)
      expect(response).to redirect_to(new_user_session_path)
    end
  end

end
