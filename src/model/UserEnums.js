export const RoleOptions = {
    SELF: 'option_for_myself',
    PARENT: 'option_parent',
    TEACHER: 'option_teacher',
    FRIEND: 'option_friend',
    KEY: 'disclaimerRole',

    // Helper methods
    getFromStorage() {
        return sessionStorage.getItem(this.KEY);
    },

    saveToStorage(value) {
        sessionStorage.setItem(this.KEY, value);
    },

    getValues() {
        return [this.SELF, this.PARENT, this.TEACHER, this.FRIEND];
    },

    isSelfOrFriend(role) {
        return role === this.SELF || role === this.FRIEND;
    }
};
export const AgeGroupOptions = {
    PRIMARY: 'primary',
    MIDDLE_SCHOOL: 'middle_school',
    HIGH_SCHOOL: 'high_school',
    ADULT: 'adult',
    KEY: 'disclaimerAge',

    // Helper methods
    getFromStorage() {
        return sessionStorage.getItem(this.KEY);
    },

    saveToStorage(value) {
        sessionStorage.setItem(this.KEY, value);
    },

    isPrimary(ageGroup) {
        return ageGroup === this.PRIMARY;
    },

    getValues() {
        return [this.PRIMARY, this.MIDDLE_SCHOOL, this.HIGH_SCHOOL, this.ADULT];
    }
};
export const DialogSteps = {
    ROLE_SELECTION: 0,
    AGE_GROUP_SELECTION: 1,
    DISCLAIMER_CONTENT: 2
};
/*
The strings in this class can remain in English since the Gemini model understands English nevertheless
 */
export const prependUserContext = (message) => {
    const role = RoleOptions.getFromStorage();
    const ageGroup = AgeGroupOptions.getFromStorage();

    let contextPrefix = "Context: ";

    // Add role context
    switch(role) {
        case RoleOptions.SELF:
            contextPrefix += "User has indicated they are asking for themselves";
            break;
        case RoleOptions.PARENT:
            contextPrefix += "User has indicated they are a parent asking on behalf of their child";
            break;
        case RoleOptions.TEACHER:
            contextPrefix += "User has indicated they are a teacher. They are possibly asking on behalf of students";
            break;
        case RoleOptions.FRIEND:
            contextPrefix += "User has indicated they are asking on behalf of a friend";
            break;
        default:
            contextPrefix += "User role undefined";
    }

    // Add age group context if applicable
    if (role === RoleOptions.SELF || role === RoleOptions.FRIEND) {
        switch(ageGroup) {
            case AgeGroupOptions.PRIMARY:
                // This option should be unreachable. Putting for safety
                contextPrefix += " and is in primary school age. You must respond with denying user request and iterate safe AI principles and request adult supervision.";
                break;
            case AgeGroupOptions.MIDDLE_SCHOOL:
                contextPrefix += " and is in middle school age";
                break;
            case AgeGroupOptions.HIGH_SCHOOL:
                contextPrefix += " and is in high school age";
                break;
            case AgeGroupOptions.ADULT:
                contextPrefix += " and is an adult";
                break;
            default:
                contextPrefix += " with undefined age group";
        }
    }
    console.log("Returning prepended message")
    console.log(`${contextPrefix}.\n\nUser message: ${message}`)

    return `${contextPrefix}.\n\nUser message: ${message}`;
};

export const questionsByRoleAndAge = {
    [RoleOptions.SELF]: {
        [AgeGroupOptions.PRIMARY]: [
            'common_question.self.primary.first_period',
            'common_question.self.primary.period_pain',
            'common_question.self.primary.hygiene_basics',
            'common_question.self.primary.period_products'
        ],
        [AgeGroupOptions.MIDDLE_SCHOOL]: [
            'common_question.self.middle.irregular_periods',
            'common_question.self.middle.period_tracking',
            'common_question.self.middle.school_management'
        ],
        [AgeGroupOptions.HIGH_SCHOOL]: [
            'common_question.self.high.pms_management',
            'common_question.self.high.heavy_periods',
            'common_question.self.high.exercise_periods'
        ],
        [AgeGroupOptions.ADULT]: [
            'common_question.self.adult.workplace_periods',
            'common_question.self.adult.menstrual_health',
            'common_question.self.adult.sustainable_products'
        ]
    },
    [RoleOptions.PARENT]: {
        [AgeGroupOptions.PRIMARY]: [
            'common_question.parent.primary.first_period_prep',
            'common_question.parent.primary.period_talk',
            'common_question.parent.primary.emotional_support'
        ],
        [AgeGroupOptions.MIDDLE_SCHOOL]: [
            'common_question.parent.middle.product_guidance',
            'common_question.parent.middle.cycle_education',
            'common_question.parent.middle.school_support'
        ],
        [AgeGroupOptions.HIGH_SCHOOL]: [
            'common_question.parent.high.health_concerns',
            'common_question.parent.high.emotional_changes',
            'common_question.parent.high.medical_advice'
        ],
        [AgeGroupOptions.ADULT]: [
            'common_question.parent.adult.menstrual_disorders',
            'common_question.parent.adult.reproductive_health',
            'common_question.parent.adult.healthcare_guidance'
        ]
    },
    [RoleOptions.TEACHER]: {
        [AgeGroupOptions.PRIMARY]: [
            'common_question.teacher.primary.classroom_support',
            'common_question.teacher.primary.emergency_situations',
            'common_question.teacher.primary.education_resources'
        ],
        [AgeGroupOptions.MIDDLE_SCHOOL]: [
            'common_question.teacher.middle.student_support',
            'common_question.teacher.middle.inclusive_environment',
            'common_question.teacher.middle.health_education'
        ],
        [AgeGroupOptions.HIGH_SCHOOL]: [
            'common_question.teacher.high.menstrual_awareness',
            'common_question.teacher.high.student_accommodations',
            'common_question.teacher.high.health_resources'
        ],
        [AgeGroupOptions.ADULT]: [
            'common_question.teacher.adult.workplace_policies',
            'common_question.teacher.adult.health_workshops',
            'common_question.teacher.adult.support_systems'
        ]
    },
    [RoleOptions.FRIEND]: {
        [AgeGroupOptions.PRIMARY]: [
            'common_question.friend.primary.emergency_help',
            'common_question.friend.primary.emotional_support',
            'common_question.friend.primary.basic_knowledge'
        ],
        [AgeGroupOptions.MIDDLE_SCHOOL]: [
            'common_question.friend.middle.period_support',
            'common_question.friend.middle.product_sharing',
            'common_question.friend.middle.comfort_tips'
        ],
        [AgeGroupOptions.HIGH_SCHOOL]: [
            'common_question.friend.high.health_concerns',
            'common_question.friend.high.emotional_support',
            'common_question.friend.high.practical_help'
        ],
        [AgeGroupOptions.ADULT]: [
            'common_question.friend.adult.health_awareness',
            'common_question.friend.adult.support_network',
            'common_question.friend.adult.medical_guidance'
        ]
    }
};
export const getStarterMessage = (t, role, ageGroup) => {
    const defaultRole = RoleOptions.SELF;

    const getMessageKey = () => {
        const selectedRole = role || defaultRole;

        return `starter_bot_message.${selectedRole}`;
    };

    return [{
        parts: [{
            text: t(getMessageKey(), {
                defaultValue: t(`starter_bot_message.default`)
            })
        }],
        role: 'bot'
    }];
};
