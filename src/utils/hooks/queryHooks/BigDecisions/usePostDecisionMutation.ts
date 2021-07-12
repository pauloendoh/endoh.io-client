import { myQueryClient } from '../../../../consts/myQueryClient';
import  API from '../../../../consts/API';
import  MY_AXIOS  from '../../../../consts/MY_AXIOS';
import { DecisionDto } from './../../../../dtos/BigDecisions/DecisionDto';
import { useMutation } from "react-query"
import {produce} from 'immer'

export default function usePostDecisionMutation() {
  return useMutation(
    (decision: DecisionDto) =>
      MY_AXIOS.post<DecisionDto>(API.BigDecisions.decision, decision).then(res => res.data),
    {
      onSuccess: (data) => {
        myQueryClient.invalidateQueries(API.BigDecisions.decision)

        const decisions = myQueryClient.getQueryData<DecisionDto[]>(API.BigDecisions.decision)

        const newDecisions = produce(decisions, draft => {
            const index = decisions.findIndex(d => d.id === data.id)
            if(~index) draft[index] = data
            else draft = [data, ...draft]
        })
        
        
        myQueryClient.setQueryData(API.BigDecisions.decision, newDecisions)
        // props.setSuccessMessage("Decision saved!")
        // handleClose()
        // history.push(PATHS.BigDecisions.decision(res.data))
      },
    }
  )
}
