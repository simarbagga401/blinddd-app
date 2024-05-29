export const sortStrings = (string1, string2) => {
  // Convert both strings to lowercase for case-insensitive comparison
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  // Compare the strings
  if (string1 < string2) {
    return `${string1}-${string2}`;
  } else if (string1 > string2) {
    return `${string2}-${string1}`;
  } else {
    return;
  }
};
