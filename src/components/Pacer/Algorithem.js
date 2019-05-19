import React, { Component } from 'react';


class Algorithem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeGame: this.props.typeGame,
            gridSize: this.props.gridSize,// memory bord size
            tmpSize: 0,
            score: this.props.score,
            shuffled: false,
            p: [],
            isFinished: this.props.isFinished,
            flag: false,
            firstTime: true,
            speed: 0,
            newLevel: this.props.newLevel,
            level: 1,

            Time: Date.now(),
            countOfCorrect: 0,
            avgSpeed: 4000
        }

        let myInterval = setInterval(() => {
            console.log("interval number : " + myInterval)
            var millis = (Date.now() - this.state.Time) / 1000;
            if (this.state.countOfCorrect > 0) {
                this.state.avgSpeed = millis / this.state.countOfCorrect
            }
            if (this.state.score != this.props.score) {
                this.state.countOfCorrect++
                // alert(this.state.avgSpeed)
            }
            console.log(this.state.avgSpeed)
            this.state.score = this.props.score
            this.setState({
                score: this.props.score, isFinished: this.props.isFinished, gridSize: this.props.gridSize,
                typeGame: this.props.typeGame, p: this.props.p, speed: this.speed()
            })
            if (this.state.isFinished && this.state.typeGame == "memory") {
                this.state.flag = true
                this.state.firstTime = true

            }
            else if (!this.state.isFinished && this.state.typeGame == "memory") {
                if (this.state.flag) {
                    this.state.level++
                    this.state.flag = false
                    this.state.newLevel = this.props.newLevel
                    this.state.Time = Date.now()
                    this.state.countOfCorrect=0
                }

            }

        }, 500)
    }

    speed() {
        // alert(this.state.avgSpeed)
        let startSpeed = this.state.avgSpeed
        console.log("startSpeed = " + startSpeed)
        let idividualPacer
        let time
        this.state.gridSize = this.props.gridSize
        let size = this.state.gridSize * this.state.gridSize
        if (this.state.typeGame == "memory") {
            startSpeed += (this.state.p.length ** 3)//+this.state.p.length*600
            size = this.state.gridSize * 2
        }

        let PacerProgress
        let score
        let pacerScore
        if (this.state.p.length == 0) {
            pacerScore = 0
        }
        else {
            pacerScore = (size - this.state.p.length) / (size)
        }
        if (this.state.score >= pacerScore) {
            if (pacerScore != 0) {
                score = (-1) * this.state.score / pacerScore * 3000
            }
            else {
                score = (-1) * this.state.score * 4000
            }
        }
        else {
            if (this.state.score != 0) {
                score = pacerScore / this.state.score * 6000

            }
            else {
                score = pacerScore * 6000
            }
        }
        console.log("score :  " + score)
        if ((size / 3) * 2 <= this.state.p.length) {
            PacerProgress = this.state.p.length * 200
        }
        else if ((size / 3) >= this.state.p.length) {
            PacerProgress = this.state.p.length * 5
        }
        else {
            PacerProgress = this.state.p.length * 350
        }
        let typeGame = this.state.typeGame


        let speedPacer = startSpeed + PacerProgress + score
        if (speedPacer < 1500) {
            speedPacer = 2500
        }

        return speedPacer
    }

    algorithem(level) {
        if (level == this.state.level) {
            this.props.algorithem()
        }
    }

    ready() {
        if (this.state.tmpSize != this.state.gridSize) {
            if (this.state.typeGame == "puzzle") {
                this.props.ready()
            }
            this.setState({ shuffled: true, tmpSize: this.state.gridSize, p: this.props.p })
        }
        else {

            this.setState({ shuffled: true, tmpSize: this.state.gridSize, p: this.props.p })
        }
    }

    interval(level) {

        this.state.p = this.props.p
        let speedPacer = this.state.speed
        if (this.state.p.length != 0 && level == this.state.level) {
            this.state.isFinished = this.props.isFinished
            if (this.state.typeGame == "memory" && this.state.firstTime) {
                if (this.state.p.length == 10) {
                    speedPacer = 6000
                }
              /*  else if (this.state.p.length == 12) {
                    speedPacer = 7000
                }
                else if (this.state.p.length == 16) {
                    speedPacer = 8000
                }*/
                this.state.firstTime = false
                this.state.isFinished = false
            }

            var intervalD = setInterval(() => {

                console.log("second interval num: " + intervalD)
                console.log("length of p is : " + this.state.p.length)
                clearInterval(intervalD)
                intervalD = false
                this.interval(level)
                console.log(speedPacer)
                console.log("clear interval num: " + intervalD)
                this.algorithem(level)
            }, speedPacer)
        }

        else {
            clearInterval(intervalD)
            intervalD = false
            this.state.shuffled = false
            this.state.isFinished = false
            this.state.p = []
        }
    }



    render() {
        if (this.state.gridSize == 0 || this.state.isFinished) {
            this.state.gridSize = this.props.gridSize
            this.state.p = []

            this.state.Time = Date.now()
            this.state.countOfCorrect=0

        }

        else {
            if (this.state.tmpSize != this.state.gridSize && this.state.newLevel || this.state.tmpSize != this.state.gridSize && this.state.typeGame == "puzzle" && !this.state.shuffled) {
                this.ready()
                this.state.newLevel = false

                this.interval(this.state.level)
            }

        }

        return (
            <div>

            </div>
        )
    }

}

export default Algorithem;