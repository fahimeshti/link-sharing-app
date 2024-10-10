const validateGitHubUrl = (url: string) => {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+(\/[\w-]+)?$/;
  return githubRegex.test(url) || "Please enter a valid GitHub URL";
};

const validateYouTubeUrl = (url: string) => {
  const regex =
    /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|@|(?:embed|shorts)\/)?[\w-]+|youtu\.be\/[\w-]+)$/;

  return regex.test(url) || "Please enter a valid YouTube URL";
};

const validateLinkedInUrl = (url: string) => {
  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
  return linkedInRegex.test(url) || "Please enter a valid LinkedIn URL";
};

export const getValidationFunction = (
  platform: "GitHub" | "YouTube" | "LinkedIn"
) => {
  switch (platform.toLowerCase()) {
    case "youtube":
      return validateYouTubeUrl;
    case "github":
      return validateGitHubUrl;
    case "linkedin":
      return validateLinkedInUrl;
    default:
      throw new Error(
        "Invalid platform. Supported platforms: GitHub, YouTube, LinkedIn."
      );
  }
};

export const findLinkByPlatform = (
  platformName: "Github" | "YouTube" | "LinkedIn",
  links: { link: string; platform: { name: string } }[]
) => {
  const platformObject = links.find(
    (item) =>
      item?.platform?.name?.toLowerCase() === platformName?.toLowerCase()
  );

  return platformObject ? platformObject.link : `#`;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
