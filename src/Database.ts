
export interface CanIUseNpmDatabase {
    packages: Record<string, Package>
}

export interface Package {
    usage: PackageUsage;
}

type PackageUsage = PackageUsageMainPointToIncorrectEnv;

interface PackageUsageMainPointToIncorrectEnv {
    type: 'main_point_to_incorrect_env';
    correct: string;
}

