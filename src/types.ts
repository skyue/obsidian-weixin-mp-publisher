import { createEntitlementsForPlan } from '../packages/shared-types/src/index.ts';

const DRAFT_RECORD_RETENTION_DAYS = 14;
const DRAFT_RECORD_LIMIT = 200;
const COVER_MEDIA_RECORD_RETENTION_DAYS = 365;
const COVER_MEDIA_RECORD_LIMIT = 500;
const ARTICLE_IMAGE_RECORD_RETENTION_DAYS = 365;
const ARTICLE_IMAGE_RECORD_LIMIT = 2000;
export const DEFAULT_SETTINGS = {
  defaultThemeId: "classic",
  defaultStyleId: "balanced",
  styleOverrides: {
    fontPreset: "sans",
    textAlign: "left",
    paragraphIndent: false,
    figureCaptionMode: "none"
  },
  preferredAccountId: null,
  accounts: [],
  savedStylePresets: [],
  draftRecords: [],
  coverMediaRecords: [],
  articleImageRecords: [],
  entitlements: createEntitlementsForPlan("free")
};
export function createEmptyAccount() {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `account-${Date.now()}`,
    name: "新账号",
    appId: "",
    appSecret: "",
    apiKey: "",
    defaultAuthor: "",
    defaultCoverPath: "",
    licenseCode: "",
    licenseToken: "",
    licenseId: "",
    licensePlan: "free",
    licenseStatus: "inactive",
    licenseCodeMasked: "",
    licenseBoundAppId: "",
    licenseActivatedAt: null,
    licenseLastValidatedAt: null
  };
}
export function createStylePresetId() {
  return globalThis.crypto?.randomUUID?.() ?? `style-preset-${Date.now()}`;
}
export function cloneStyleOverrides(styleOverrides) {
  return { ...styleOverrides };
}
export function normalizePublisherAccount(account) {
  return {
    ...createEmptyAccount(),
    ...account ?? {},
    id: typeof account?.id === "string" && account.id.trim() ? account.id : globalThis.crypto?.randomUUID?.() ?? `account-${Date.now()}`,
    name: typeof account?.name === "string" && account.name.trim() ? account.name : "未命名账号",
    appId: typeof account?.appId === "string" ? account.appId : "",
    appSecret: typeof account?.appSecret === "string" ? account.appSecret : "",
    apiKey: typeof account?.apiKey === "string" ? account.apiKey : "",
    defaultAuthor: typeof account?.defaultAuthor === "string" ? account.defaultAuthor : "",
    defaultCoverPath: typeof account?.defaultCoverPath === "string" ? account.defaultCoverPath : "",
    licenseCode: typeof account?.licenseCode === "string" ? account.licenseCode : "",
    licenseToken: typeof account?.licenseToken === "string" ? account.licenseToken : "",
    licenseId: typeof account?.licenseId === "string" ? account.licenseId : "",
    licensePlan: account?.licensePlan === "pro" ? "pro" : "free",
    licenseStatus: account?.licenseStatus === "active" || account?.licenseStatus === "expired" || account?.licenseStatus === "revoked" ? account.licenseStatus : "inactive",
    licenseCodeMasked: typeof account?.licenseCodeMasked === "string" ? account.licenseCodeMasked : "",
    licenseBoundAppId: typeof account?.licenseBoundAppId === "string" ? account.licenseBoundAppId : "",
    licenseActivatedAt: typeof account?.licenseActivatedAt === "string" ? account.licenseActivatedAt : null,
    licenseLastValidatedAt: typeof account?.licenseLastValidatedAt === "string" ? account.licenseLastValidatedAt : null
  };
}
export function cloneDraftRecords(draftRecords) {
  const normalizedRecords = Array.isArray(draftRecords) ? draftRecords.filter(
    (record) => Boolean(record?.notePath && record?.accountId && record?.mediaId)
  ).map((record) => ({
    notePath: String(record.notePath),
    accountId: String(record.accountId),
    mediaId: String(record.mediaId),
    title: typeof record.title === "string" ? record.title : "",
    updatedAt: typeof record.updatedAt === "string" && record.updatedAt ? record.updatedAt : (/* @__PURE__ */ new Date()).toISOString()
  })) : [];
  return pruneDraftRecords(normalizedRecords);
}
export function cloneCoverMediaRecords(coverMediaRecords) {
  const normalizedRecords = Array.isArray(coverMediaRecords) ? coverMediaRecords.filter(
    (record) => Boolean(record?.accountId && record?.sourceKey && record?.mediaId)
  ).map((record) => ({
    accountId: String(record.accountId),
    sourceKey: String(record.sourceKey),
    mediaId: String(record.mediaId),
    updatedAt: typeof record.updatedAt === "string" && record.updatedAt ? record.updatedAt : (/* @__PURE__ */ new Date()).toISOString()
  })) : [];
  return pruneCoverMediaRecords(normalizedRecords);
}
export function pruneDraftRecords(draftRecords) {
  const cutoffTime = Date.now() - DRAFT_RECORD_RETENTION_DAYS * 24 * 60 * 60 * 1e3;
  return draftRecords.filter((record) => {
    const updatedAtTime = new Date(record.updatedAt).getTime();
    return Number.isFinite(updatedAtTime) && updatedAtTime >= cutoffTime;
  }).sort((left3, right3) => {
    return new Date(right3.updatedAt).getTime() - new Date(left3.updatedAt).getTime();
  }).slice(0, DRAFT_RECORD_LIMIT);
}
export function pruneCoverMediaRecords(coverMediaRecords) {
  const cutoffTime = Date.now() - COVER_MEDIA_RECORD_RETENTION_DAYS * 24 * 60 * 60 * 1e3;
  return coverMediaRecords.filter((record) => {
    const updatedAtTime = new Date(record.updatedAt).getTime();
    return Number.isFinite(updatedAtTime) && updatedAtTime >= cutoffTime;
  }).sort((left3, right3) => {
    return new Date(right3.updatedAt).getTime() - new Date(left3.updatedAt).getTime();
  }).slice(0, COVER_MEDIA_RECORD_LIMIT);
}
export function cloneArticleImageRecords(articleImageRecords) {
  const normalizedRecords = Array.isArray(articleImageRecords) ? articleImageRecords.filter(
    (record) => Boolean(record?.accountId && record?.sourceKey && record?.url)
  ).map((record) => ({
    accountId: String(record.accountId),
    sourceKey: String(record.sourceKey),
    url: String(record.url),
    updatedAt: typeof record.updatedAt === "string" && record.updatedAt ? record.updatedAt : (/* @__PURE__ */ new Date()).toISOString()
  })) : [];
  return pruneArticleImageRecords(normalizedRecords);
}
export function pruneArticleImageRecords(articleImageRecords) {
  const cutoffTime = Date.now() - ARTICLE_IMAGE_RECORD_RETENTION_DAYS * 24 * 60 * 60 * 1e3;
  return articleImageRecords.filter((record) => {
    const updatedAtTime = new Date(record.updatedAt).getTime();
    return Number.isFinite(updatedAtTime) && updatedAtTime >= cutoffTime;
  }).sort((left3, right3) => {
    return new Date(right3.updatedAt).getTime() - new Date(left3.updatedAt).getTime();
  }).slice(0, ARTICLE_IMAGE_RECORD_LIMIT);
}

// TypeScript type definitions for lint compliance
export interface PublisherAccount {
  id: string;
  name: string;
  appId: string;
  appSecret: string;
  apiKey?: string;
  defaultAuthor?: string;
  defaultCoverPath?: string;
  licenseCode?: string;
  licenseToken?: string;
  licenseId?: string;
  licensePlan?: string;
  licenseStatus?: string;
  licenseCodeMasked?: string;
  licenseBoundAppId?: string;
  licenseActivatedAt?: string | null;
  licenseLastValidatedAt?: string | null;
}

export interface DraftRecord {
  notePath: string;
  accountId: string;
  mediaId: string;
  title: string;
  updatedAt: string;
}

export interface CoverMediaRecord {
  accountId: string;
  sourceKey: string;
  mediaId: string;
  updatedAt: string;
}

export interface ArticleImageRecord {
  accountId: string;
  sourceKey: string;
  url: string;
  updatedAt: string;
}

export interface StyleOverrides {
  fontPreset: string;
  textAlign: string;
  paragraphIndent: boolean;
  figureCaptionMode: string;
}

export interface PublisherSettings {
  defaultThemeId: string;
  defaultStyleId: string;
  styleOverrides: StyleOverrides;
  preferredAccountId: string | null;
  accounts: PublisherAccount[];
  savedStylePresets: any[];
  draftRecords: DraftRecord[];
  coverMediaRecords: CoverMediaRecord[];
  articleImageRecords: ArticleImageRecord[];
  entitlements: any;
}

export interface ImageAsset {
  bytes: Uint8Array;
  contentType: string;
  filename: string;
  sourceUrl?: string;
  filePath?: string;
}

export interface HtmlImageRef {
  src: string;
  originalSource?: string;
}

export interface ParsedDataUrl {
  mimeType: string;
  data: string;
  isBase64: boolean;
}

export interface RehostResult {
  html: string;
  imageCount: number;
  articleImageRecords: ArticleImageRecord[];
}

export interface PublishInput {
  app: any;
  account: PublisherAccount;
  file: any;
  html: string;
  frontmatter: any;
  existingDraftMediaId: string | null;
  coverMediaRecords: CoverMediaRecord[];
  articleImageRecords: ArticleImageRecord[];
  onProgress?: (message: string) => void;
}

export interface PublishResult {
  mediaId: string;
  title: string;
  imageCount: number;
  action: string;
  coverMediaRecord?: CoverMediaRecord;
  articleImageRecords?: ArticleImageRecord[];
}

