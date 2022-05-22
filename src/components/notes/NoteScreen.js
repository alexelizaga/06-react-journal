import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange ] = useForm(note);

    console.log( formValues );
    const { id, date, title, body } = formValues;

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="what happened today"
                    className="notes__text-area"
                    autoComplete="off"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    note.url &&
                    (
                        <div className="notes__image">
                            <img
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>
        </div>
    )
}
