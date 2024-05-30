export const mapToSelectOptions = (map: Map<string, string>) =>
	[...map].map(([value, label]) => ({ label, value }));
