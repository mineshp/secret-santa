import { useReducer } from 'react';
import uuidv4 from 'uuid/v4';

function useMembers(initialState) {
  const memberReducer = (prevState, data) => {
    const index = prevState.findIndex((member) => member.rowId === data.id)
    // duplicate the state array, not modify
    const newState = [...prevState];

    switch (data.type) {
      case 'UPDATE_NAME':
        // update the object at the index
        newState[index] = {
          ...newState[index],
          memberName: data.value
        };
        return newState; // return new array
      case 'UPDATE_EMAIL':
        newState[index] = {
          ...newState[index],
          email: data.value
        };
        return newState; // return new array
      case 'ADD':
        return [
          ...prevState,
          {
            rowId: uuidv4(),
            memberName: '',
            email: ''
          }
        ];
      default:
        return prevState;
    }
  }

  const [members, dispatch] = useReducer(memberReducer, [
    ...initialState,
    {
      rowId: uuidv4(),
      memberName: '',
      email: ''
    }
  ]);

  const update = (type) => (event, data) => dispatch({
    type: `UPDATE_${type.toUpperCase()}`,
    id: data.id,
    value: event.target.value
  })

  const add = () => dispatch({ type: 'ADD' });

  return [
    members,
    add,
    update
  ]
};

export default useMembers;
