const UserStore = {
    data : {
        users : [
            {
                real_name   : 'Forat Seif',
                nick_name   : 'FS',
                email_id    : 'foratseif@epigram.ai',
                type        : 'member',
                login_status: true,
                color       : 'green'
            },
            {
                real_name   : 'Johan Korsmo',
                nick_name   : 'JK',
                email_id    : 'johan.k@epigram.ai',
                type        : 'member',
                login_status: false,
                color       : 'orange'
            },
            {
                real_name   : 'Asbjørn Sola',
                nick_name   : 'AS',
                email_id    : 'asbjom_sola@epigram.ai',
                type        : 'member',
                login_status: false,
                color       : 'blue'
            },
            {
                real_name   : 'Oda Sofie Dahl Eide',
                nick_name   : 'OE',
                email_id    : 'odasofiedahleide@epigram.ai',
                type        : 'owner',
                login_status: false ,   
                color       : 'cyan'               
            },
            {
                real_name   : 'Olav Djupvik',
                nick_name   : 'OD',
                email_id    : 'olav@epigram.ai',
                type        : 'member',
                login_status: false ,   
                color       : 'red'               
            },
        ],
    }
}

export default UserStore;