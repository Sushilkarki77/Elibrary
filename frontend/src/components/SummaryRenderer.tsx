import React from 'react';
import ReactMarkdown from 'react-markdown';



type SummaryRenderProps = {
    summary: string;
}

const SummaryRenderer: React.FC<SummaryRenderProps> = ({ summary }) => {

    return (<><ReactMarkdown>{summary}</ReactMarkdown></>)
}

export default SummaryRenderer;
