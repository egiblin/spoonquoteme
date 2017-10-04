class Quote < ApplicationRecord

  def next_id
    unless Quote.last.id == self.id
      i = 1
      while Quote.find(self.id + i) == false
        i += 1
      end
      Quote.find(self.id + i)
    else
      self.id
    end
  end

  def previous_id
    unless Quote.first.id == self.id
      i = 1
      while Quote.find(self.id - i) == false
        i += 1
      end
      Quote.find(self.id - i)
    else
      self.id
    end
  end
end
