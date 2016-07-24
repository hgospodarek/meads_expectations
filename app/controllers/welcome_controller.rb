class WelcomeController < ApplicationController
  def index
    if user_signed_in?
      redirect_to :controller=>'batches', :action => 'index'
    # else
    #   redirect_to '/public/example_html_file.html'
    end
  end
end
