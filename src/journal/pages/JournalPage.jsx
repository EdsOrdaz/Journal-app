import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../view"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {

  const { active, isSaving } = useSelector( state => state.journal );
  const dispatch = useDispatch();
  const onClickNewNote = () => {
      dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {
        (!!active)
        ? <NoteView />
        : <NothingSelectedView />
      }

        <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: '0.7'},
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
          onClick={ onClickNewNote }
          disabled={ isSaving }
        >
            <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
    </JournalLayout>
  )
}
