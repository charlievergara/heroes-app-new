import { heroAPI } from "../heroes.api"
import type { SummaryInformationResponse } from "../types/summary-information.response"

export const getSummaryAction = async ()=>{
    const { data } = await heroAPI.get<SummaryInformationResponse>(`/summary`)

    return data
}