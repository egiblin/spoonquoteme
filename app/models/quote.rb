class Quote < ApplicationRecord

  def next_id
    unless Quote.last.id == self.id
      Quote.find(self.id + 1)
    else
      self.id
    end
  end

  def previous_id
    unless Quote.first.id == self.id
      Quote.find(self.id - 1)
    else
      self.id
    end
  end
end
