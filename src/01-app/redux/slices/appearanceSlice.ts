import { createSlice} from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppearanceState {
  // опиши здесь поля состояния, например:
  // theme: 'light' | 'dark'
}

const initialState: AppearanceState = {
  // начальное состояние
}

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    // добавь редьюсеры, например:
    // setTheme(state, action: PayloadAction<'light' | 'dark'>) {
    //   state.theme = action.payload
    // }
  },
})

// export const {

// } = appearanceSlice.actions

export default appearanceSlice.reducer