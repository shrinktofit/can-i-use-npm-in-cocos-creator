
/**
 * The database.
 */
export interface CanIUseNpmDatabase {
    /**
     * All npm package infos. Keys are package ID. Values are package info.
     */
    packages: Record<string, PackageInfo>
}

/**
 * Package info.
 */
export interface PackageInfo {
    /**
     * The usage(s) of modules within this package.
     */
    usage: PackageUsage | PackageUsage[];
}

/**
 * The usage of a module within a package.
 */
export type PackageUsage = CommonJsUsage | EsmUsage;

/**
 * Describes the usage of a module within a package.
 */
interface UsageBase {
    /**
     * The module's subpath into the package.
     */
    path: string;
}

/**
 * Describes the usage of a CommonJS module within a package.
 */
export interface CommonJsUsage extends UsageBase {
    module: "commonjs",

    /**
     * The showing CommonJS default import of this module.
     */
    as: string,
}

/**
 * Describes the usage of a ESM module within a package.
 */
export interface EsmUsage extends UsageBase {
    module: "module",

    /**
     * The showing ESM exports of this module.
     */
    export: {
        "type": "default",
        /**
         * The showing default export.
         */
        "as": string,
    } | {
        "type": "named",
        /**
         * The showing name export(s) or(and) default exports.
         */
        "exports": string | string[] | NamedExport | NamedExport[],
    }
}

interface NamedExport {
    /**
     * Local binding name of this named export binding.
     */
    local: string,

    /**
     * The exported name of this named export binding.
     */
    exported: string,
}

