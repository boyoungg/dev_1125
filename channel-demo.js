const express = require('express')
const app = express()
app. listen(9999)
app.use(express.json())

let db = new Map()
var id = 1

app
    .route('/channels')
    .get((req, res) => {
        res.send("전체조회")

    })

    .post((req, res) => {
        if (req.body.channelId){
            db.set(id++ , req.body)
            res.status(201).json({
                message: `${db.get(id-1).channelId} 님 채널 생성 추카추카해!`
            })
        } else {
            res.status(400).json({
                message: `채널명을 입력해줘!`
            })
        }


    })



app
    .route('/channels/:id')
    .get((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        var channelName = db.get(id)

        if(channelName) {
            res.status(200).json(channelName)
        } else {
            res.status(404).json({
                message: `없는 채널인거같아!`
            })
        }
    

    })
    .put((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        var channelName = db.get(id)
        var oldTit = channelName.channelId

        if(channelName) {
            var newTit = req.body.channelId
            db.set(id, channelName)

            res.status(200).json({
                message: `채널명이 ${oldTit} 에서  ${newTit} 로 변경되었습니다`
            })

        } else {
            res.status(404).json({
                message: `없는 채널인거같아!`
            })
        }

    })
    .delete((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        var channelName = db.get(id)
        var channelTIt = channelName.channelId

        if(channelName) {
            db.delete(id)
            res.status(200).json({
                message: `${channelTIt} 이 삭제됐어!`
            })
        } else {
            res.status(404).json({
                message: `없는 채널인거같아!`
            })
        }

    })



