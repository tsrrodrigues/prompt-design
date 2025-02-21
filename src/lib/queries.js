export const getDocumentsByRequestId = `
    SELECT 
        rpd.id,
        coalesce(rd."name", f."name") as label,
        case when rd.id is not null then rd.url else f.name || '\n' || coalesce(fo.name, rf.value) end as value,
       	case when rd.id is not null then 'document' else 'field' end as type,
        rpd.prompt::text,
       	rpd.details::text as result,
        rpd.request_document_id as request_document_id,
        rpd.details->>'extracted_text' as extracted_text
    FROM 
        automatic_production.request_process_document rpd
    LEFT join
    	operations.fields f on f.id = rpd.field_id
    left join
    	operations.request_fields rf on rf.field_id = rpd.field_id and rf.request_id = rpd.request_id
    left join
        operations.field_options fo on fo.id::text = rf.value
    left join
    	operations.request_documents rd on rd.id = rpd.request_document_id 
    WHERE 
        rpd.request_id = $1
    ORDER BY 
        id ASC
`

export const getQuestionsByRequestId = `
    SELECT 
        rc.*,
        q.prompt as question_prompt
    FROM 
        automatic_production.request_context rc
    JOIN
        automatic_production.questions q on q.id = rc.question_id
    WHERE 
        rc.request_id = $1
        and rc.deleted is null
        order by q.order
` 