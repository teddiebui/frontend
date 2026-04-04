
import { useState, useCallback } from "react";
import { facebookUserService } from "@/services/facebookUserService";
import type {
	FacebookUserListDTO,
	FacebookUserDetailDTO,
	FacebookUserSearchCriteria,
	PaginationResponse
} from "@/types";

/**
 * 
 * Unified, cache-friendly, reusable Facebook user data hook
 * Provides CRUD, search, and export for Facebook users
 */
export function useFacebookUser() {
	const [users, setUsers] = useState<FacebookUserListDTO[]>([]);
	const [detail, setDetail] = useState<FacebookUserDetailDTO | null>(null);
	const [pagination, setPagination] = useState<PaginationResponse<FacebookUserDetailDTO> | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch all Facebook users (list)
	const fetchAll = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.getAll();
			if (res.success && res.data) setUsers(res.data);
			else setError(res.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch Facebook user detail by id
	const fetchDetail = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.get(id);
			if (res.success && res.data) setDetail(res.data);
			else setError(res.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	// Search Facebook users with criteria and pagination
	const search = useCallback(async (
		criteria: Partial<FacebookUserSearchCriteria>,
		pageable?: Record<string, unknown>
	) => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.search(criteria, pageable);
			if (res.success && res.data) {
				setPagination(res.data);
				setUsers(res.data.content || []);
			} else {
				setError(res.message);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	// Create a new Facebook user
	const create = useCallback(async (user: FacebookUserDetailDTO) => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.create(user);
			if (res.success && res.data) setDetail(res.data);
			else setError(res.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	// Update an existing Facebook user
	const update = useCallback(async (user: FacebookUserDetailDTO) => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.update(user);
			if (res.success && res.data) setDetail(res.data);
			else setError(res.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	// Delete a Facebook user by id
	const remove = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.delete(id);
			if (res.success) setUsers((prev) => prev.filter(u => u.facebookId !== id));
			else setError(res.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	// Export Facebook users to Excel
	const exportExcel = useCallback(async (criteria: Partial<FacebookUserSearchCriteria>) => {
		setLoading(true);
		setError(null);
		try {
			const blob = await facebookUserService.exportExcel(criteria);
			return blob;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	// Delete multiple Facebook users by ids
	const deleteAll = useCallback(async (ids: string[]) => {
		setLoading(true);
		setError(null);
		try {
			const res = await facebookUserService.deleteAll(ids);
			if (res.success) setUsers((prev) => prev.filter(u => !ids.includes(u.facebookId)));
			else setError(res.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		users,
		detail,
		pagination,
		loading,
		error,
		fetchAll,
		fetchDetail,
		search,
		create,
		update,
		remove,
		exportExcel,
		deleteAll,
	};
}
