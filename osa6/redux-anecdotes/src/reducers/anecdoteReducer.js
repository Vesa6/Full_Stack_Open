import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

// This needs to be up here for map method below
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdoteAction: (state, action) => {
      // console.log(action)
      const idOfAnecdote = action.payload.id
      const anec = state.find(a => a.id === idOfAnecdote)
      // console.log(idOfAnecdote)
      if (anec) {
        const changedAnec = { ...anec, votes: anec.votes + 1 }
        const newState = state.map(a => a.id !== idOfAnecdote ? a : changedAnec)
        
        // Sorts in place
        newState.sort((a, b) => b.votes - a.votes)
        return newState
      }
    },
    createAnecdoteAction: (state, action) => {
      const newAnecdoteObj = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      state.push(newAnecdoteObj)
      state.sort((a, b) => b.votes - a.votes);
    }
  }
})

export const { voteAnecdoteAction, createAnecdoteAction } = anecdoteSlice.actions
export default anecdoteSlice.reducer