import { NotesAppBar } from "./NotesAppBar"

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
        <NotesAppBar />

        <div className="notes__content">

            <input
                type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
            />

            <textarea
                placeholder="what happened today"
                className="notes__text-area"
                autoComplete="off"
            ></textarea>

            <div className="notes__image">
                <img
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                    alt="imagen"
                />
            </div>

        </div>
    </div>
  )
}
