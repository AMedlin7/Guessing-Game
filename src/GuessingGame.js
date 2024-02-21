import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './GuessingGame.css'


const GuessingGame = () => {

    const [guess, setGuess] = useState ("");
    const [ message, setMessage] = useState ("Start Guessing");
    const [randomNumber, setRandomNumber] = useState (null);
    const [timeGuessed, setTimeGuessed] = useState(null);


    useEffect(() => {


        if (randomNumber === null) {

            setRandomNumber(
                JSON.parse(localStorage.getItem("random")) || getNum()
            )
        }

        if (timeGuessed === null) {

            setTimeGuessed(
                JSON.parse(localStorage.getItem("guesses")) || 0
            )
        }




    }, []);





    function getNum() {

        let random = Math.floor(Math.random() * 100);


        localStorage.setItem("random", JSON.stringify(random));

        return random;
    }

    function handleSubmit(e){
        e.preventDefault();
    
        let parseNum = parseInt(guess);

        
        

        if (parseNum === randomNumber){
            setMessage("You Got It Right!")
        } else if ( parseNum > randomNumber) {
            setMessage(" That's Too High!")
        } else {
            setMessage("That's Too Low!")
        }

        setTimeGuessed(timeGuessed + 1);
        localStorage.setItem("guesses", JSON.stringify(timeGuessed + 1));
    }

    function handleChange(e){

        if( !isNaN(e.target.value)) {
            setGuess(e.target.value);
        } else{
            alert("YO! Type a number!")
        }
    }
 
    function reset() {
        setGuess("");
        setMessage("Start Guessing!");
        setTimeGuessed(0);
        setRandomNumber(getNum());
        localStorage.removeItem("guesses");
    }

    return (
     <>
     <Form onSubmit={handleSubmit}>

     <Form.Group className="mb-3">
        <Form.Label>
            I am thinking of a number between 1 and 100, Guess the lucky number!
        </Form.Label>
        <br />
        <Form.Label>You have made {timeGuessed} guesses!</Form.Label>
     <Form.Control
        type="text"
        onChange={handleChange}
        value={guess}
        name="guess"
        />
     <br/>
     <Button type="submit">Guess</Button>
     <br/>
     <br/>
     <Button onClick={reset} type="button">Reset</Button>
     <br/>
     <br/>
     <Form.Label>{message}</Form.Label>

    
     </Form.Group>

     </Form>

     </>
)
};

export default GuessingGame;