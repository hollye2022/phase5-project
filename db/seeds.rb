# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# habits = Habit.create([{name: "Go to the gym"}, {name: "Get up early"}, {name: "Eat fruits"}, {name: "No Starbucks"}, {name: "Go to bed before 10:30"}, {name: "Clean the house"}])
Habit.destroy_all
User.destroy_all
Streak.destroy_all

h1 = Habit.create(name:"Go to the gym")
h2 = Habit.create(name:"Get up early")
h3 = Habit.create(name:"Eat fruits")
h4 = Habit.create(name:"No Starbucks")
h5 = Habit.create(name:"Go to bed early")
h6 = Habit.create(name:"Clean the house")

user1 = User.create(username: "Holly",email:"hhh@gmail.com", password:"hhh1234")
user2 = User.create(username: "Mike",email:"mmm@gmail.com", password:"mmm1234")

s1 = Streak.create(count:0, user:user1, habit:h1)
s2 = Streak.create(count:0, user:user1, habit:h2)
s3 = Streak.create(count:0, user:user2, habit:h1)
s4 = Streak.create(count:0, user:user2, habit:h3)

n1 = Note.create(user:user1, content:"I am happy that I went to the gym today!")

#  debugger

