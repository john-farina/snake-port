![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)
![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">Snake</h1>

  <p align="center">
    A web recreation of the classic game Snake
    <br />
    <a href="https://snake.johnfarina.co">View Live Demo</a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#react">React</a>
      <ul>
        <li><a href="#state">State</a></li>
        <li><a href="#game-logic">Game Logic</a></li>
        <ul>
            <li><a href="#drawing-grid">Drawing Grid</a></li>
            <li><a href="#drawing--moving-snake-in-grid">Drawing & Moving Snake in Grid</a></li>
            <li><a href="#snake-collision">Snake Collision</a></li>
            <li><a href="#random-food-spawn">Random Food Spawn</a></li>
      </ul>
      </ul>
    </li>
    <li><a href="#rails">Rails</a></li>
    <ul>
        <li><a href="#model">Model</a></li>
        <li><a href="#controller">Controller</a></li>
    </ul>
    <li><a href="#design">Design</a></li>
    <ul>
        <li><a href="#header">Header</a></li>
        <li><a href="#game-screen">Game Screen</a></li>
        <li><a href="#buttons">Buttons</a></li>
    </ul>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

This is a web recreation of the classic snake game, but when you get a high score you can save it for the world to see. Using React inside of Rails.

<img src="./app/assets/images/readme/playing-snake-2.gif" />

### Built With
 - Rails
 - React
 - SCSS

## React

### State

#### **Snake**
The whole state of the project is revolving around the coordinates of snake, which are default 2 arrays inside an array. I sparingly use States in the project only using it for what is needed to update every frame or so. <br/>
I am also saving a string with `useRef` that is saying what direction the snake is facing which helps with moving it around.

#### **Food Coordinates**
The food coordinates are saved in a `useRef` so I don't lose the value of it with all the other React data. And getting the value using `.current`

#### **Grid**
For saving and updating the grid I'm using a `useMemo` because I want the grid to update every time the Snake updates OR when food coordinates update. So I can properly update the array that coordinates with the graph, inside the use memo I am drawing the grid every time snake or food is updated.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Game Logic

#### **Drawing Grid**
Every time snake updates the `drawGrid` function is getting called, which takes in snake coordinates, and food coordinates. It loops through the set Grid array and puts each one correspondingly. The first set in the snake array is drawn as the snake head, and the last is the tail. The rest of the array is placed as a snake body. And the food coordinates get placed as food.

#### **Moving & Growing Snake in Grid**
For moving the snake in the grid I remove the last value in the Snake Array and add another value to the first value. Determining which direction the snake is going the first or second spot in the new coordinates will be adjusted accordingly. <br/>
For Growing the snake when a player eats food, I add a value behind the last one, growing the tail out by one. I did it from the tail so it doesn't mess with the players movements.

#### **Snake Collision**
For Snake collision I'm using functions inside a `useMemo`, for snake to wall collision I am seeing if the head position in Snake Array ever is equal to 0 or 1, etc. depending on which wall. And if the direction is the one which it would run into it.
This is in a `useMemo` because I want to run checks every time the snake moves if it ran into something.
The Snake to food collision is practically the same as the rest but only seeing if the Snake Head value is equal to the food Coordinates, and if it is then it grows the snake by one

#### **Random Food Spawn**
Food is spawned randomly on the grid and will keep trying to spawn if it failed because snake was in that position. Food cannot be spawned on the snake.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Rails

### Model
I wanted to save the high scores in a classic arcade way. (3 letter save no login) so all I'm saving in rails is a `PlayerScore` model which saves the 3 letter string. And the players score which is saved inside a hidden value in forms, so the user cant manipulate it on screen.
When submitting I save a fake value over React that shows your score right away without a refresh. When user refreshes/reloads the real score replaces the fake score that was just saved.

### Controller
In the controller I am taking all saved high scores and ordering them by value, and sending that back to react so I can then show the user a ranked high score in order.

I also am creating new `PlayerScores` over params, and saving when the user submits the form.

### Gems
The most important gem I'm using in this project is <br/>
`gem react-rails`  <br/>
This is one out of two React gems, I find this one works better and adds less of a hassle to set it up and use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Design

### Header
for the Title header I wanted to go for an engraved Game Boy type of title, so I added a shadow inside the text making it look more indented with a blinking red light to the right of it <br/>

<img src="./app/assets/images/readme/header.png" width="400" />

I also added a point counter in the top right to fill up space, and it updates when a User gets more points

### Screen
For the screen I added a screen texture over the square div. This works out really well to emulate an older screen texture. And I made the background a shade of green that is also the color of old Game Boy screens and basing the rest of the colors around a darker green scale. <br/>
The Food is bright white and glows trying to make it more obvious that it's what the goal of the game is

#### **Animations**
Most animations are being run on steps to make it not smooth on purpose with the whole emulation feel I was going for. Text animation growing and shrinking, or colors going back and forth

<img src="./app/assets/images/readme/screen.gif" width="350"/>

### Buttons
For the buttons I made them bigger so it's easier to click if user isn't using the arrow keys. The colors are based off of how older generation game controllers had this color scheme of buttons, For the clicks I remove the background shadow and scale it down slightly to create the illusion of an actual button going down.

<img src="./app/assets/images/readme/buttons.gif" width="350" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

To play snake click anywhere on the screen to start, or any button. When started you can use the on-screen buttons to move around or the arrow keys on your keyboard. <br/>
Eat the squares to grow and try not to run into yourself or any walls.

<!-- CONTACT -->
## Contact

**John Farina** - johnfarina8@gmail.com

My Website: [johnfarina.co](https://johnfarina.co)

Project Link: [github.com/john-farina/snake-port](https://github.com/john-farina/snake-port)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





