/* Hier checken wir ob der user bereits 3 PDF hochgeladen hat oder nicht */
import supabase from '../supabaseClient/page';

export default async function canUpload(user_id) {
    // Fetch the user's pdf_metadata from the database
    const { data, error } = await supabase
      .from('pdf_metadata')
      .select('*')
      .eq('user_id', user_id)
      .single();
  
    if (error) {
      // Handle error
      return false;
    }
  
    const today = new Date().toDateString();
    const lastUploadedDay = data.last_uploaded_at ? new Date(data.last_uploaded_at).toDateString() : null;
  
    // If it's a new day, reset the pdf_count to 0 and allow the upload
    if (today !== lastUploadedDay) {
      await supabase
        .from('pdf_metadata')
        .update({ pdf_count: 1, last_uploaded_at: new Date() }) // Reset to 1 as this is the first upload of the day
        .eq('user_id', user_id);
      return true;
    }
  
    // If the user has uploaded fewer than 3 PDFs today, allow the upload
    if (data.pdf_count < 3) {
      await supabase
        .from('pdf_metadata')
        .update({ pdf_count: data.pdf_count + 1, last_uploaded_at: new Date() }) // Increment by 1
        .eq('user_id', user_id);
      return true;
    }
  
    // If pdf_count is 3 or more, the user can't upload more PDFs today
    return false;
  }
