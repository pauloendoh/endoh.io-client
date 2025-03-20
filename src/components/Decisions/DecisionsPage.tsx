import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useDialogsStore from "store/zustand/useDialogsStore"
import { siteTitles } from "utils/consts/siteTitles"
import { stringIsValidNumber } from "utils/math/stringIsValidNumber"
import { urls } from "utils/urls"
import useDecisionsQuery from "../../hooks/BigDecisions/Decision/useDecisionsQuery"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import DecisionContent from "./DecisionContent/DecisionContent"
import DecisionDialog from "./DecisionDialog/DecisionDialog"
import DecisionSidebar from "./DecisionSidebar/DecisionSidebar"
import DecisionTableDialog from "./DecisionTableDialog/DecisionTableDialog"
import S from "./DecisionsPage.styles"

// PE 3/3
const DecisionsPage = () => {
  const { id: queryId } = useParams<{ id: string }>()
  const { openSidebar } = useSidebarStore()

  const decisionId = stringIsValidNumber(queryId!) ? Number(queryId) : null

  useEffect(() => {
    document.title = siteTitles.decisions
    openSidebar()
  }, [])

  const { data: allDecisions } = useDecisionsQuery()
  const navigate = useNavigate()
  useEffect(() => {
    if (decisionId === null && allDecisions?.length)
      navigate(urls.pages.BigDecisions.decision(allDecisions[0].id!!))
  }, [allDecisions])

  const {
    decisionDialogOpen,
    decisionDialogValue,
    closeDecisionDialog,

    decisionTableDialogOpen,
    decisionTableDialogValue,
    closeDecisionTableDialog,
  } = useDialogsStore()

  const { sidebarIsOpen } = useSidebarStore()

  return (
    <S.DecisionsPageRoot>
      <DecisionSidebar selectedDecisionId={decisionId!!} />
      <S.ContentWrapper $sidebarIsOpen={sidebarIsOpen}>
        {queryId && <DecisionContent decisionId={decisionId!!} />}
      </S.ContentWrapper>

      <DecisionDialog
        initialValue={decisionDialogValue!!}
        open={decisionDialogOpen}
        onClose={closeDecisionDialog}
      />

      <DecisionTableDialog
        initialValue={decisionTableDialogValue!!}
        open={decisionTableDialogOpen}
        onClose={closeDecisionTableDialog}
      />
    </S.DecisionsPageRoot>
  )
}

export default DecisionsPage
