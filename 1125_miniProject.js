const express = require('express')
const app = express()
app. listen(9999)
app.use(express.json())

let db = new Map()
var id = 1

app.post('/join', (req, res) => {

    if(req.body == {}) {
        res.status(400).json({
            message: `입력 확인 필요!!`
        })
    } else {
        db.set(id++, req.body)
        res.status(201).json({
            message: `${db.get(id-1).name} 님 환영합니다.`
        })
    }
})

app.post('/login', (req, res) => {
    // userId가 db에 저장되어있는가?
    const {userId, password} = req.body
    var loginInfo = {} // 중괄호 있으면 텅비어도 값있는거임.

    db.forEach(function(value, key) {
        console.log(value.userId)
        if(value.userId == userId) {
            loginInfo = value
        } 
    })
    
    //id 관련 
    if(existInfo(loginInfo)){
        console.log("아이디 같은거 있엉!")
        if (loginInfo.password === password) {
            console.log("패스워드도 같아. 로그인 성공!")
        } else {
            console.log("패스워드 틀림. 비밀번호 확인해~")
        }
    } else {
        console.log("아이디 확인요망")
    }

    // id 객체 빈 객체 인지 아닌지 확인
    function existInfo(obj) {
        if(Object.keys(obj).length) {
            return true;
        } else {
            return false;
        }
    }

    // pw가 일치하는가?




})


app.get('/users/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    const userInfo = db.get(id)

    if(userInfo == undefined){
        res.status(404).json({
            message: "회원정보 없음."
        })
    }else{
        res.json({
            userId : userInfo.userId,
            name: userInfo.name
        })

    }
})

app.delete('/users/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    const userInfo = db.get(id)

    if(userInfo == undefined){
        res.status(404).json({
            message: "회원정보 없음."
        })
    }else{
        db.delete(id)
        res.status(200).json({
            message: `다음에 또만나요 ${userInfo.name} 님!`
        })

    }
})