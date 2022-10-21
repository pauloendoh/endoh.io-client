import produce from "immer"
import React, { useMemo, useState } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import { NoteDto } from "../../../../../types/domain/define/NoteDto"
import FinishedFlashcardDialogChild from "./FinishedFlashcardDialogChild/FinishedFlashcardDialogChild"
import QuestionFlashcardDialogChild from "./QuestionFlashcardDialogChild/QuestionFlashcardDialogChild"

// PE 2/3
const StartedFlashcardDialogChild = (props: {
  questions: NoteDto[]
  onFinish: () => void
}) => {
  const [localQuestions, setLocalQuestions] = useState(props.questions)
  const [questionIndex, setQuestionIndex] = useState(0)

  const [wrongs, setWrongs] = useState(0)
  const [halves, setHalves] = useState(0)
  const [corrects, setCorrects] = useState(0)

  const [results, setResults] = useState<NoteDto[]>([])

  const handleWrong = () => {
    setWrongs(wrongs + 1)
    nextQuestion()

    const currentNote = localQuestions[questionIndex]
    setResults([...results, { ...currentNote, weight: currentNote.weight * 4 }])
  }

  const handleHalf = () => {
    setHalves(halves + 1)
    nextQuestion()

    const currentNote = localQuestions[questionIndex]
    setResults([...results, { ...currentNote, weight: currentNote.weight * 2 }])
  }

  const handleCorrect = () => {
    setCorrects(corrects + 1)
    nextQuestion()

    const currentNote = localQuestions[questionIndex]
    if (currentNote.weight === 1) {
      setResults([...results, currentNote])
      return
    }
    setResults([...results, { ...currentNote, weight: currentNote.weight / 2 }])
  }

  const nextQuestion = () => {
    if (questionIndex === localQuestions.length - 1) {
      return
    } else setQuestionIndex(questionIndex + 1)
  }

  const isFinished = () => results.length === localQuestions.length

  const editQuestion = (newNote: NoteDto) => {
    setLocalQuestions(
      produce(localQuestions, (draftNotes) => {
        const index = draftNotes.findIndex((n) => n.id === newNote.id)
        draftNotes[index] = newNote
        return draftNotes
      })
    )
  }

  const docs = useDocsStore((s) => s.docs)

  const currentQuestion = useMemo(() => localQuestions[questionIndex], [
    localQuestions,
    questionIndex,
  ])
  const currentQuestionDoc = useMemo(
    () => docs.find((d) => d.id === currentQuestion.docId),
    [docs, currentQuestion]
  )

  return (
    <React.Fragment>
      {isFinished() ? (
        <FinishedFlashcardDialogChild
          wrongs={wrongs}
          halves={halves}
          corrects={corrects}
          results={results}
          onFinish={props.onFinish}
        />
      ) : (
        <QuestionFlashcardDialogChild
          question={localQuestions[questionIndex]}
          questionNumber={questionIndex + 1}
          totalQuestions={localQuestions.length}
          docTitle={currentQuestionDoc.title}
          closeDialog={props.onFinish}
          onEditQuestion={editQuestion}
          onWrongAnswer={handleWrong}
          onHalfAnswer={handleHalf}
          onCorrectAnswer={handleCorrect}
        />
      )}
    </React.Fragment>
  )
}

export default StartedFlashcardDialogChild
