import styled from "styled-components"
import { TaskStyles } from "./Task.styles"

export const DroppableColumnStyles = styled.div`
    height: fit-content;
`
export const ColumnHeaderStyles = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 24px 0 24px 0;
`
export const ColumnHeaderDot = styled.span`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 12px;
`

export const ColumnHeaderName = styled.span`
    display: flex;
    gap: .25em;
`

export const ColumnStyles = styled.div``
export const ColumnItemStyles = styled.div`
    ${TaskStyles} {
        margin: 20px 0;
    }
`