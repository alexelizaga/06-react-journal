import { useSelector } from 'react-redux';

import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

  const { notes } = useSelector( state => state.notes);
  console.log( notes );

  return (
    <div className="journay__entries">
      {
        notes.map( note => (
          <JournalEntry
            key={ note.id }
            { ...note }
          />
        ))
      }
    </div>
  )
}
