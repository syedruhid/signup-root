import Typography from '../../../components/ui/Typography';

function OnboardingHeader() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <Typography variant="h3" fontVariant="primary" customClassName="font-light text-[#132C4A]">
        Let's get started
      </Typography>
      <Typography variant="h1" fontVariant="primary" customClassName="font-bold">
        Create your account
      </Typography>
      <Typography variant="body" fontVariant="primary" customClassName="font-normal">
        Follow the steps to create your account
      </Typography>
    </div>
  );
}

export default OnboardingHeader;
