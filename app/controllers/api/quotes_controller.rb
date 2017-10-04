class Api::QuotesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def show
    @quote = Quote.find(params[:id])
  end

  def create
    data = JSON.parse(request.body.read)
    last_id = Quote.last.id
    @quote = Quote.create(author: data["author"], text: data["text"], id: (last_id + 1))
  end
end
