
export interface CanIUseNpmDatabase {
    packages: Record<string, Package>
}

export interface Package {
    usage: PackageUsage | PackageUsage[];
}

type PackageUsage = CommonJsUsage | EsmUsage;

interface UsageBase {
    path: string;
}

interface CommonJsUsage extends UsageBase {
    module: "commonjs",
    as: string,
}

interface EsmUsage extends UsageBase {
    module: "module",
    export: {
        "type": "default",
        "as": string,
    } | {
        "type": "named",
        "exports": string | string[] | NamedExport | NamedExport[],
    }
}

interface NamedExport {
    local: string,
    as: string,
}

