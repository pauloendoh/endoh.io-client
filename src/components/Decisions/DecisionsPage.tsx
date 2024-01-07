import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
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

  const decisionId = stringIsValidNumber(queryId) ? Number(queryId) : null

  useEffect(() => {
    document.title = siteTitles.decisions
    openSidebar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: allDecisions } = useDecisionsQuery()
  const history = useHistory()
  useEffect(
    () => {
      if (decisionId === null && allDecisions?.length)
        history.push(urls.pages.BigDecisions.decision(allDecisions[0].id!!))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allDecisions]
  )

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
