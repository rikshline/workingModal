module.exports = {
    originalDataHeaders: [
        {
            sheet: 'Demographics',
            fields: [
                'MRN',
                'First',
                'Last',
                'Birth DT',
                'Death DT',
                'Race',
                'Sex',
                'AD Sex',
                'Extra Column w/o Mapping'
            ]
        },
        {
            sheet: 'Samples',
            fields: [
                'MRN',
                'Sample ID',
                'Biopsy Date',
                'Type',
                'Class',
                'Slide ID',
                'Block No'
            ]
        },
        {
            sheet: 'Procedures',
            fields: [
                'MRN',
                'Proc DT',
                'Procedure',
                'Intent',
                'Site',
                'Discharge DT'
            ]
        },
        {
            sheet: 'Info Sheet - No Mapping',
            fields: [
                'This Sheet Contains a Legend and Details about This File - Leave Unmapped to Drop from import session'
            ]
        }
    ]
};
