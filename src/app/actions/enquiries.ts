'use server'

import { updateEnquiryStatus } from '@/lib/enquiries'
import { revalidatePath } from 'next/cache'

/**
 * Server Action to mark an enquiry status
 */
export async function toggleEnquiryStatusAction(id: string, currentStatus: string) {
  try {
    const nextStatus = currentStatus === 'pending' ? 'responded' : 'pending'
    await updateEnquiryStatus(id, nextStatus as any)
    revalidatePath('/admin/enquiries')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to toggle enquiry status:', error)
    return { success: false, error: 'Failed to update status' }
  }
}
