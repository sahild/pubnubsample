class StreamerController < ApplicationController

  def index
  end
  
  def dial
    render :layout => false
  end

  def publish
    render :json => $pubnub.publish(
        :channel => 'pubnub_chat',
        :callback => lambda {|x|},
        :message => {
            :author => params[:author],
            :message => params[:message]

        }
    )
  end

  def get_messages
    render :json => Message.all
  end

  def status
    render :text => $pubnub.inspect
  end

  private

end
