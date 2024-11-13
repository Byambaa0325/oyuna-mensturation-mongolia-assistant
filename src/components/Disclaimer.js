import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {AgeGroupOptions, DialogSteps, RoleOptions} from "../model/UserEnums";
import LanguageToggleButton from "./LanguageToggleButton";


// Step Components
const RoleSelectionStep = ({ onSelectRole }) => {
    const { t } = useTranslation();
    const roleOptions = RoleOptions.getValues();

    return (
        <>

            <DialogTitle color="text.background">
                {t('disclaimer.title')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText color="text.background" sx={{ textAlign: 'center' }}>
                    {t('disclaimer.select_role_text')}
                </DialogContentText>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {roleOptions.map((roleKey) => (
                        <Button
                            key={roleKey}
                            onClick={() => onSelectRole(roleKey)}
                            color="text.primary"
                            variant="outlined"
                            sx={{ width: '200px' }}
                        >
                            {t(`disclaimer.${roleKey}`)}
                        </Button>
                    ))}
                    <LanguageToggleButton/>
                </Box>
            </DialogContent>
        </>
    );
};

const AgeGroupSelectionStep = ({ onSelectAgeGroup }) => {
    const { t } = useTranslation();
    const ageOptions = AgeGroupOptions.getValues();

    return (
        <>
            <DialogTitle color="text.background">
                {t('disclaimer.age_group_title')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText color="text.background" sx={{ textAlign: 'center' }}>
                    {t('disclaimer.select_age_group_text')}
                </DialogContentText>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {ageOptions.map((ageKey) => (
                        <Button
                            key={ageKey}
                            onClick={() => onSelectAgeGroup(ageKey)}
                            color="text.primary"
                            variant="outlined"
                            sx={{ width: '200px' }}
                        >
                            {t(`disclaimer.age_group_${ageKey}`)}
                        </Button>
                    ))}
                    <LanguageToggleButton/>
                </Box>
            </DialogContent>
        </>
    );
};

const DisclaimerContentStep = ({ onClose }) => {
    const { t } = useTranslation();
    return (
        <>
            <DialogTitle color="text.background">
                {t('disclaimer.final_title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText color='text.background'>
                    {t('disclaimer.pop_up_text')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="outlined"
                    sx={{ fontWeight: 'bold' }}
                >
                    {t('close')}
                </Button>
            </DialogActions>
        </>
    );
};
const DisclaimerDialog = () => {
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [step, setStep] = useState(DialogSteps.ROLE_SELECTION);

    // Check storage values when component mounts
    useEffect(() => {
        const storedRole = RoleOptions.getFromStorage();
        const storedAgeGroup = AgeGroupOptions.getFromStorage();

        if (!storedRole) {
            return; // No stored role, start from beginning
        }

        if (RoleOptions.isSelfOrFriend(storedRole)) {
            if (storedAgeGroup) {
                // Both role and age group are set
                setStep(DialogSteps.DISCLAIMER_CONTENT);
            } else {
                // Only role is set, need age group
                setStep(DialogSteps.AGE_GROUP_SELECTION);
            }
        } else {
            // Role is set and it's not self/friend
            setStep(DialogSteps.DISCLAIMER_CONTENT);
        }
    }, []);

    const handleRoleSelection = (roleKey) => {
        RoleOptions.saveToStorage(roleKey);

        if (RoleOptions.isSelfOrFriend(roleKey)) {
            setStep(DialogSteps.AGE_GROUP_SELECTION);
        } else {
            setStep(DialogSteps.DISCLAIMER_CONTENT);
        }
        window.dispatchEvent(new Event('userPreferencesUpdated'));
    };

    const handleAgeGroupSelection = (ageGroup) => {
        AgeGroupOptions.saveToStorage(ageGroup);
        setStep(DialogSteps.DISCLAIMER_CONTENT);
        window.dispatchEvent(new Event('userPreferencesUpdated'));
    };

    return (
        <Dialog
            open={showDisclaimer}
            onClose={() => setShowDisclaimer(false)}
            aria-labelledby="disclaimer-dialog-title"
        >
            {step === DialogSteps.ROLE_SELECTION && (
                <RoleSelectionStep onSelectRole={handleRoleSelection} />
            )}
            {step === DialogSteps.AGE_GROUP_SELECTION && (
                <AgeGroupSelectionStep onSelectAgeGroup={handleAgeGroupSelection} />
            )}
            {step === DialogSteps.DISCLAIMER_CONTENT && (
                <DisclaimerContentStep onClose={() => setShowDisclaimer(false)} />
            )}
        </Dialog>
    );
};

export default DisclaimerDialog;
