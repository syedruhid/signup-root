import Typography from "../../../components/ui/Typography";

function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-8">
      <Typography variant="h3" fontVariant="primary" customClassName="font-medium">You're all set!</Typography>
      <Typography variant="body" fontVariant="secondary" customClassName="text-gray-500">Your account has been created successfully.</Typography>
    </div>
  );
}

export default SuccessStep;
