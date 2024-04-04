import { produce } from "immer"
import React, { useMemo, useState } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import { upsert } from "utils/array/upsert"
import { QuestionDto } from "../../../../../types/domain/questions/QuestionDto"
import FinishedFlashcardDialogChild from "./FinishedFlashcardDialogChild/FinishedFlashcardDialogChild"
import QuestionFlashcardDialogContent from "./QuestionFlashcardDialogContent/QuestionFlashcardDialogContent"

// PE 2/3
const StartedFlashcardDialogChild = (props: {
  questions: QuestionDto[]
  onFinish: () => void
}) => {
  const [localQuestions, setLocalQuestions] = useState(props.questions)
  const [questionIndex, setQuestionIndex] = useState(0)

  const [wrongs, setWrongs] = useState(0)
  const [halves, setHalves] = useState(0)
  const [corrects, setCorrects] = useState(0)

  const [results, setResults] = useState<QuestionDto[]>([])

  const handleWrong = () => {
    setWrongs(wrongs + 1)
    nextQuestion()

    const currentNote = localQuestions[questionIndex]
    const note = { ...currentNote, weight: currentNote.weight * 4 }

    setResults(upsert(results, note, (r) => r.id === note.id))
  }

  const handleHalf = () => {
    setHalves(halves + 1)
    nextQuestion()

    const currentNote = localQuestions[questionIndex]

    const note = { ...currentNote, weight: currentNote.weight * 2 }
    setResults(upsert(results, note, (r) => r.id === note.id))
  }

  const handleCorrect = () => {
    setCorrects(corrects + 1)
    nextQuestion()

    const currentNote = localQuestions[questionIndex]

    const newWeight = Math.floor(currentNote.weight / 2)

    const note = {
      ...currentNote,
      weight: newWeight <= 1 ? 1 : newWeight,
    }

    setResults(upsert(results, note, (r) => r.id === note.id))
  }

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const isFinished = useMemo(
    () => questionIndex >= localQuestions.length,
    [questionIndex, localQuestions]
  )

  const editQuestion = (newQuestion: QuestionDto) => {
    setLocalQuestions(
      produce(localQuestions, (draftNotes) => {
        const index = draftNotes.findIndex((n) => n.id === newQuestion.id)
        draftNotes[index] = newQuestion
        return draftNotes
      })
    )

    setResults((curr) =>
      upsert(curr, newQuestion, (r) => r.id === newQuestion.id)
    )

    nextQuestion()
  }

  const docs = useDocsStore((s) => s.docs)

  const currentQuestion = useMemo(
    () => localQuestions[questionIndex],
    [localQuestions, questionIndex]
  )
  const currentQuestionDoc = useMemo(
    () => docs.find((d) => d.id === currentQuestion?.docId),
    [docs, currentQuestion]
  )

  return (
    <React.Fragment>
      {isFinished ? (
        <FinishedFlashcardDialogChild
          wrongs={wrongs}
          halves={halves}
          corrects={corrects}
          results={results}
          onFinish={props.onFinish}
        />
      ) : (
        <QuestionFlashcardDialogContent
          question={localQuestions[questionIndex]}
          questionNumber={questionIndex + 1}
          totalQuestions={localQuestions.length}
          docTitle={currentQuestionDoc?.title || ""}
          closeDialog={props.onFinish}
          onEditQuestion={editQuestion}
          onWrongAnswer={handleWrong}
          onHalfAnswer={handleHalf}
          onCorrectAnswer={handleCorrect}
          isFirst={questionIndex === 0}
          goBack={() => {
            setQuestionIndex((curr) => curr - 1)
          }}
          goNext={() => {
            setQuestionIndex((curr) => curr + 1)
          }}
        />
      )}
    </React.Fragment>
  )
}

export default StartedFlashcardDialogChild
