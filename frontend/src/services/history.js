import { supabase } from "./supabase";
import { getDeviceId } from "./device";

export async function saveScanHistory({
  scannerType,
  inputData,
  result,
}) {
  const deviceId = getDeviceId();

  const { data, error } = await supabase
    .from("scan_history")
    .insert([
      {
        device_id: deviceId,
        scanner_type: scannerType,
        input_data: inputData,
        risk_score: result.risk_score,
        status: result.status,
        title: result.title,
        description: result.description,
        findings: result.findings || [],
        recommendations:
          result.recommendations || [],
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to save scan history:",
      error
    );

    throw error;
  }

  return data;
}


export async function getScanHistory() {
  const deviceId = getDeviceId();

  const { data, error } = await supabase
    .from("scan_history")
    .select("*")
    .eq("device_id", deviceId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Failed to load scan history:",
      error
    );

    throw error;
  }

  return data || [];
}


export async function deleteScanHistory(id) {
  const deviceId = getDeviceId();

  const { error } = await supabase
    .from("scan_history")
    .delete()
    .eq("id", id)
    .eq("device_id", deviceId);

  if (error) {
    console.error(
      "Failed to delete scan:",
      error
    );

    throw error;
  }
}


export async function clearScanHistory() {
  const deviceId = getDeviceId();

  const { error } = await supabase
    .from("scan_history")
    .delete()
    .eq("device_id", deviceId);

  if (error) {
    console.error(
      "Failed to clear history:",
      error
    );

    throw error;
  }
}