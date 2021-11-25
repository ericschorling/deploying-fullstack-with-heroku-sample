import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        fName: '',
        lName: '',
        userName: '',
        image_url: undefined,
        userID: 0,
        userBlurb: undefined
    },
    reducers: {
        setLoggedIn: state =>{
            state.loggedIn = true
        },
        setUserData: (state, action)=>{
            state.userName = action.payload.username
            state.image_url = action.payload.avatarsource
            state.fName = action.payload.realname
            state.lName = action.payload.lastname
            state.userID = action.payload.userid
        },
        resetUser: (state)=>{
            state.loggedIn = false
            state.userName = ''
            state.image_url = undefined
            state.fName = ''
            state.lName = ''
            state.userID = ''
            state.userBlurb = undefined
        }
    }
})

export const { setLoggedIn, setUserData } = userSlice.actions

export default userSlice.reducer