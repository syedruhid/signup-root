import { ShieldCheckIcon, TickIcon } from '../../../assets/customSvg/genericIcons';
import BottomSheet from '../../../components/ui/Bottomsheet';
import Button from "../../../components/ui/Button";
import CustomPopup from "../../../components/ui/PopUp";
import Typography from "../../../components/ui/Typography";
import { useMediaQuery } from '../../../lib/useMediaQuery';
import type { SignupData } from "../types";

function SuccessContent({ data, onClick }: { data: SignupData; onClick: () => void }) {
    const { accountType, accountInfo, email } = data ?? {};
    const accountInfoData = [
        { label: 'Account Type', value: accountType?.charAt(0).toUpperCase() + accountType?.slice(1) },
        { label: 'Name', value: `${accountInfo?.name} ${accountInfo?.lastName}` },
        { label: 'Mobile', value: data?.countryCode + " " + data?.mobileNo },
        { label: 'Email', value: email || "dev@root.com" },
    ];

    return (
        <>
            <div className="flex justify-center items-center mb-2">
                <TickIcon color="#4B59D5" outlined height={25} width={25} />
            </div>
            <Typography fontVariant="primary" customClassName="font-large text-2xl mb-2">
                You’re all set!
            </Typography>
            <Typography className="text-[14px] text-normal text-[#565656] mb-6">
                Here’s a quick summary of your account details
            </Typography>
            <div className="flex flex-col gap-2 p-[24px] bg-[#F5F5F5] rounded-2xl">
                <div className="flex flex-col gap-2">
                    {accountInfoData.map((item) => (
                        <div key={item.label} className="flex flex-row justify-between gap-2">
                            <Typography className="text-[14px] text-normal text-[#565656]">
                                {item.label}
                            </Typography>
                            <Typography className="text-[14px] text-normal text-[#565656]">
                                {item.value}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center mt-6 gap-1'>
                <ShieldCheckIcon color="#047647" />
                <Typography className="text-[12px] text-normal text-[#565656]">
                    Your account is secured with bank-grade security
                </Typography>
            </div>
            <Button className="w-full max-w-[280px] sm:w-[60%] mt-10 bg-[#0054FD] text-white" variant="primary" onClick={onClick}>
                Go To Dashboard
            </Button>
        </>
    );
}

export default function SuccessPopUp({ data, onClick }: { data: SignupData, onClick: () => void }) {
    const isMobile = useMediaQuery('(min-width: 600px)');

    if (isMobile) {
        return (
            <CustomPopup
                show={true}
                onClose={() => { }}
                isDismissible={false}
                customStyle={{ width: '479px', padding: '32px 26px', textAlign: 'center' }}
            >
                <SuccessContent data={data} onClick={onClick} />
            </CustomPopup>
        );
    }

    return (
        <BottomSheet
            isOpen
            setOpen={() => { }}
            isDismissible={false}
            disableDrag
        >
            <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 text-center">
                <SuccessContent data={data} onClick={onClick} />
            </div>
        </BottomSheet>
    );
}
